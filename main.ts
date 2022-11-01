namespace SpriteKind {
    export const Location = SpriteKind.create()
    export const coin = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy += Jump_Speed
    }
})
function setLevelTileMap () {
    if (Level == 0) {
        tiles.setCurrentTilemap(tilemap`level12`)
        Jump_Speed = -200
    }
    if (Level == 1) {
        tiles.setCurrentTilemap(tilemap`level19`)
        Jump_Speed = -250
    }
    if (Level == 2) {
        tiles.setCurrentTilemap(tilemap`level2`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    info.setScore(info.score() + 1)
    coin.destroy()
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    game.over(false, effects.melt)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile8`, function (sprite, location) {
    game.over(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile27`, function (sprite, location) {
    game.over(false)
})
function CreateEnemy () {
    myEnemy = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    animation.runImageAnimation(
    myEnemy,
    assets.animation`myAnim0`,
    200,
    true
    )
    tiles.placeOnRandomTile(myEnemy, sprites.swamp.swampTile0)
    myEnemy.follow(mySprite)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    music.jumpUp.play()
    Level = 1
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 25))
    tiles.placeOnTile(myEnemy, tiles.getTileLocation(0, 15))
    setLevelTileMap()
})
let Jump_Speed = 0
let myEnemy: Sprite = null
let coin: Sprite = null
let mySprite: Sprite = null
let Level = 0
setLevelTileMap()
Level = 1
game.showLongText("INSTRUCTIONS", DialogLayout.Bottom)
game.showLongText("press UP or W to jump. hold the jump button to jump higher.", DialogLayout.Bottom)
game.showLongText("OBJECT OF THE GAME", DialogLayout.Bottom)
game.showLongText("try to get the highest score and complete all the levels of the game", DialogLayout.Bottom)
game.showLongText("CONTROLS", DialogLayout.Bottom)
game.showLongText("UP or W = jump   RIGHT or D = move to the right   LEFT or A = move left ", DialogLayout.Bottom)
game.showLongText("TIPS", DialogLayout.Bottom)
game.showLongText("coins give you 50 points ", DialogLayout.Bottom)
game.showLongText("there is a bird chasing you, so don't take too long", DialogLayout.Bottom)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
coin = sprites.create(assets.tile`myTile25`, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 0)
animation.runImageAnimation(
mySprite,
assets.animation`MainCharachter`,
200,
true
)
tiles.placeOnTile(coin, tiles.getTileLocation(3, 16))
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 24))
CreateEnemy()
myEnemy.follow(mySprite, 50)
mySprite.ay = 350
game.onUpdate(function () {
    controller.moveSprite(mySprite, 100, 0)
    scene.cameraFollowSprite(mySprite)
})
