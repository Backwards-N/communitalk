Sup.loadScene("Loading Screen");

class CharacterBehavior extends Sup.Behavior {
  awake() {
    this.actor.spriteRenderer.setAnimation("rotate", false);
    this.actor.spriteRenderer.pauseAnimation();
  }
  
  update() {
    let keyFrame = 0;
    
    if (Sup.Input.isKeyDown("A")) {
      this.actor.move(-0.05, 0, 0);
      this.actor.spriteRenderer.setAnimationFrameTime(6);
      
      keyFrame = 6;
    }
    if (Sup.Input.isKeyDown("D")) {
      this.actor.move(0.05, 0, 0);
      this.actor.spriteRenderer.setAnimationFrameTime(2);
      
      keyFrame = 2;
    }
    if (Sup.Input.isKeyDown("W")) {
      this.actor.move(0, 0.025, 0);
      
      if (keyFrame == 6) {
        this.actor.spriteRenderer.setAnimationFrameTime(3);
      } else if (keyFrame == 2) {
        this.actor.spriteRenderer.setAnimationFrameTime(5);
      } else {
        this.actor.spriteRenderer.setAnimationFrameTime(4);
      }
    }
    if (Sup.Input.isKeyDown("S")) {
      this.actor.move(0, -0.025, 0);
    
      if (keyFrame == 6) {
        this.actor.spriteRenderer.setAnimationFrameTime(7);
      } else if (keyFrame == 2) {
        this.actor.spriteRenderer.setAnimationFrameTime(1);
      } else {
        this.actor.spriteRenderer.setAnimationFrameTime(0);
      }
    }
  }
}
Sup.registerBehavior(CharacterBehavior);

class CameraBehavior extends Sup.Behavior {
  update() {
    if (Sup.Input.isKeyDown("A")) this.actor.move(-0.05, 0, 0);
    if (Sup.Input.isKeyDown("D")) this.actor.move(0.05, 0, 0);
    if (Sup.Input.isKeyDown("W")) this.actor.move(0, 0.025, 0);
    if (Sup.Input.isKeyDown("S")) this.actor.move(0, -0.025, 0);
  }
}
Sup.registerBehavior(CharacterBehavior);

function loadWorld(world) {
  Sup.loadScene(world);

  let localPlayerActor = new Sup.Actor("LocalPlayer");
  new Sup.SpriteRenderer(localPlayerActor, "PlayerBotSprite");
  
  let skyActor = new Sup.Actor("LocalPlayer");
  new Sup.SpriteRenderer(skyActor, "BluSkies");
  
  let cameraManActor = new Sup.Actor("Camera");
  new Sup.Camera(cameraManActor);
  cameraManActor.camera.setOrthographicMode(true);
  
  localPlayerActor.setPosition(0, 0, 9.5);
  cameraManActor.setPosition(0, 0, 10);
  skyActor.setPosition(0, 0, -200)
  
  localPlayerActor.addBehavior(CharacterBehavior);
  cameraManActor.addBehavior(CameraBehavior);
  skyActor.addBehavior(CameraBehavior);
}

loadWorld("HubWorld");