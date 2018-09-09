Sup.loadScene("Loading Screen");

function loadWorld(world) {
  Sup.loadScene(world);

  let mainCharacterActor = new Sup.Actor("LocalPlayer");
  new Sup.SpriteRenderer(mainCharacterActor, "PlayerBotSprite");
  
  let cameraManActor = new Sup.Actor("Camera");
  new Sup.Camera(cameraManActor);
  
  mainCharacterActor.setPosition(0, 0, 0);
  cameraManActor.setPosition(0, 0, 5);
}

loadWorld("HubWorld");