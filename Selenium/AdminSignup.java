package org.example;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

public class AdminSignup {
	static void waitTime(int a ){
        try {
            Thread.sleep(a);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
	public static void main(String[] args) {
		System.setProperty("webdriver.chrome.driver","Drivers\\chromedriver.exe");
	    WebDriver driver = new ChromeDriver();
	    driver.get("http://localhost:5173/");
	    driver.manage().window().maximize();
	    WebElement btn = driver.findElement(By.id("startbtn"));
	    waitTime(2000);
	    btn.click();
	    
	    waitTime(2000);
        WebElement adminSign= driver.findElement(By.id("adminLogin"));
        adminSign.click();
        
        waitTime(2000);
        WebElement userName= driver.findElement(By.id(":r1:"));
        userName.isDisplayed();
        userName.isEnabled();
        userName.sendKeys("tietD@gamil.com");
        
        waitTime(2000);
        WebElement password= driver.findElement(By.id(":r3:"));
        password.isDisplayed();
        password.isEnabled();
        password.sendKeys("tietD@123");
        
        waitTime(2000);
        WebElement btn_signup = driver.findElement(By.id("btn_signup"));
        btn_signup.click();
        
        waitTime(3000);
	    driver.close();
	
	}

}
