{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "xkcdpw"
, dependencies = [ "affjax", "halogen" ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
