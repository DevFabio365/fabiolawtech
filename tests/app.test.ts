import { Builder, By, until, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

(async () => {
  const options = new chrome.Options();
  options.addArguments("--disable-gpu");
  options.addArguments("--window-size=1200,800");
  options.addArguments("--headless=new");

  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {    
    await driver.get("http://localhost:5173/login");
    
    const emailInput = await driver.findElement(By.css('input[placeholder="E-mail"]'));
    await emailInput.sendKeys("admin@gmail.com");

    const senhaInput = await driver.findElement(By.css('input[placeholder="Senha"]'));
    await senhaInput.sendKeys("1234");
    await senhaInput.sendKeys(Key.RETURN);

    //await driver.sleep(500);
    
    try {      
      await driver.executeScript(`
        const form = document.querySelector('form.login-form');
        if (form) form.requestSubmit();
      `);      
    } catch {      
      await driver.executeScript("document.getElementById('login-btn').click()");      
    }
    
    //await driver.wait(until.urlContains("/admin"), 500);
    
    await driver.get("http://localhost:5173/admin/testscreen");
    
    let nomePokemon: string = "venusaur";

    // Espera o input aparecer para interagir
    const input = await driver.wait(until.elementLocated(By.id("nome-input")), 500);
    await input.sendKeys(nomePokemon);

    const botao = await driver.findElement(By.id("buscar-btn"));
    await botao.click();

    const resultado = await driver.wait(until.elementLocated(By.id("resultado")), 500);
    const texto = await resultado.getText();

    if (texto.toLowerCase().includes(nomePokemon)) {
      console.log("Teste passou! Pokémon encontrado.");
    } else {
      console.error("Teste falhou. Texto inesperado:", texto);
    }
  } catch (e) {
    console.error("Erro no teste:", e);
  } finally {
    await driver.quit();
  }
})();