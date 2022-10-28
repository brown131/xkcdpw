{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "xkcdpw"
, dependencies = [ "aff"
                 , "affjax"
                 , "affjax-web"
                 , "arrays"
                 , "effect"
                 , "either"
                 , "halogen"
                 , "integers"
                 , "maybe"
                 , "prelude"
                 , "strings" ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
