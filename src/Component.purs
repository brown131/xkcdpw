module Component (component) where

import Prelude

import Affjax.Web as AX
import Affjax.ResponseFormat as AXRF
import Data.Array (length, take, (!!))
import Data.Either (Either(..))
import Data.Int (decimal, fromString, toStringAs)
import Data.Maybe (Maybe(..), fromMaybe)
import Data.String as S
import Data.String.Pattern as P
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import WordList (wordList)

type State = { password :: String }

data Action = Initialize | GeneratePassword

component :: ∀ f i o m. MonadAff m => H.Component f i o m
component =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval $ H.defaultEval { handleAction = handleAction
                                     , initialize = Just Initialize } }

initialState :: ∀ i. i -> State
initialState _ = { password: "_ _ _ _" }

render :: ∀ m. State -> H.ComponentHTML Action () m
render state =
  HH.div_
    [ HH.h1_ [ HH.text "xkcd Password Generator" ]
    , HH.div
       [ HP.class_ $ HH.ClassName "xkcd_panel" ]
       [ HH.p
         [ HP.class_ $ HH.ClassName "xkcd_result" ]
         [ HH.text state.password ]
       , HH.p
         [ HP.class_ $ HH.ClassName "xkcd_result_len" ]
         [ HH.span [ HP.id "xkcd_pw_result_len" ] [ HH.text $ show $ (S.length state.password) - 3 ]
         , HH.text " characters"
         ]
        , HH.button [ HP.type_ HP.ButtonSubmit, HE.onClick \_ -> GeneratePassword ]
        [ HH.text "Generate Another!" ] ] ]

randomToWord :: String -> String
randomToWord r = fromMaybe "" $ wordList !! (fromMaybe 0 $ fromString r)

generatePassword :: ∀ m. MonadAff m => m String
generatePassword = do
    let url = "https://www.random.org/integers/?num=4&min=0&max=" <> (toStringAs decimal $ length wordList) <>
              "&col=1&base=10&&format=plain&rnd=new"
    response <- H.liftAff $ AX.get AXRF.string url
    let password = case response of
                    Left e -> AX.printError e
                    Right r -> S.joinWith " " $ randomToWord <$> (take 4 $ S.split (P.Pattern "\n") r.body)
    pure password

handleAction :: ∀ o m. MonadAff m => Action -> H.HalogenM State Action () o m Unit
handleAction = case _ of
  Initialize -> do
    randoms <- generatePassword
    H.put { password: randoms }
  GeneratePassword -> do
    randoms <- generatePassword
    H.put { password: randoms }
