namespace SpriteKind {
    export const Location = SpriteKind.create()
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
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
	
})
function doSomething () {
	
}
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile30`, function (sprite, location) {
    game.splash("New Level Unlocked!")
    Level = 2
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 27))
    tiles.placeOnTile(myEnemy, tiles.getTileLocation(0, 15))
    setLevelTileMap()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile26`, function (sprite, location) {
    music.jumpUp.play()
    Level = 1
    tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 25))
    tiles.placeOnTile(myEnemy, tiles.getTileLocation(0, 15))
    setLevelTileMap()
})
let Jump_Speed = 0
let myEnemy: Sprite = null
let mySprite: Sprite = null
let Level = 0
setLevelTileMap()
Level = 1
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
controller.moveSprite(mySprite, 100, 0)
animation.runImageAnimation(
mySprite,
assets.animation`MainCharachter`,
200,
true
)
tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 24))
CreateEnemy()
myEnemy.follow(mySprite, 50)
mySprite.ay = 350
game.onUpdate(function () {
    controller.moveSprite(mySprite, 100, 0)
    info.changeScoreBy(1)
    scene.cameraFollowSprite(mySprite)
})
