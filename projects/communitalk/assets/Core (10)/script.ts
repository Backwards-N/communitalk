Sup.loadScene("Loading Screen");

class CharacterBehavior extends Sup.Behavior {
  awake() {
    this.actor.spriteRenderer.setAnimation("rotate", false);
    this.actor.spriteRenderer.pauseAnimation();
  }
  
  update() {
    let keyFrame = 0;
    let velocity = this.actor.arcadeBody2D.getVelocity();
    
    if (Sup.Input.isKeyDown("A")) {
      velocity.x = -0.05;
      this.actor.spriteRenderer.setAnimationFrameTime(6);
      
      if (!Sup.Input.isKeyDown("S") || !Sup.Input.isKeyDown("W")) {
        velocity.y = 0;
      }
      
      keyFrame = 6;
    } else if (Sup.Input.isKeyDown("D")) {
      velocity.x = 0.05;
      this.actor.spriteRenderer.setAnimationFrameTime(2);
      
      if (!Sup.Input.isKeyDown("S") || !Sup.Input.isKeyDown("W")) {
        velocity.y = 0;
      }
      
      keyFrame = 2;
    }
    
    if (Sup.Input.isKeyDown("W")) {
      velocity.y = 0.025;
      
      if (keyFrame == 6) {
        this.actor.spriteRenderer.setAnimationFrameTime(3);
      } else if (keyFrame == 2) {
        this.actor.spriteRenderer.setAnimationFrameTime(5);
      } else {
        this.actor.spriteRenderer.setAnimationFrameTime(4);
        velocity.x = 0;
        keyFrame = 4;
      }
    } else if (Sup.Input.isKeyDown("S")) {
      velocity.y = -0.025;
    
      if (keyFrame == 6) {
        this.actor.spriteRenderer.setAnimationFrameTime(7);
      } else if (keyFrame == 2) {
        this.actor.spriteRenderer.setAnimationFrameTime(1);
      } else {
        this.actor.spriteRenderer.setAnimationFrameTime(0);
        velocity.x = 0;
        keyFrame = 3;
      }
    }
    
    if (keyFrame == 0) {
      velocity.x = 0;
      velocity.y = 0;
    }
    
    this.actor.arcadeBody2D.setVelocity(velocity);
    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, Sup.ArcadePhysics2D.getAllBodies());
  }
}
Sup.registerBehavior(CharacterBehavior);

class CameraBehavior extends Sup.Behavior {
  update() {
    this.actor.setPosition(currentPlayerActor.getPosition().x, currentPlayerActor.getPosition().y, this.actor.getPosition().z);
  }
}
Sup.registerBehavior(CharacterBehavior);

function loadWorld(world, x, y) {
  Sup.loadScene(world);

  let localPlayerActor = new Sup.Actor("LocalPlayer");
  new Sup.SpriteRenderer(localPlayerActor, "PlayerHeadSprite");
  
  let skyActor = new Sup.Actor("LocalPlayer");
  new Sup.SpriteRenderer(skyActor, "BluSkies");
  
  let cameraManActor = new Sup.Actor("Camera");
  new Sup.Camera(cameraManActor);
  cameraManActor.camera.setOrthographicMode(true);
  
  localPlayerActor.setPosition(x, y, 9.5);
  new Sup.ArcadePhysics2D.Body(localPlayerActor,
                               0,
                               {movable: true,
                                width: 0.5,
                                height: 0.5,
                                offset: { x: 0, y: 0 },
                                bounce: { x: 0, y: 0 }})
  cameraManActor.setPosition(x, y, 10);
  skyActor.setPosition(x, y, -200)
  
  localPlayerActor.addBehavior(CharacterBehavior);
  cameraManActor.addBehavior(CameraBehavior);
  skyActor.addBehavior(CameraBehavior);
  
  return localPlayerActor;
}

let currentPlayerActor = loadWorld("HubWorld", -2, -4);