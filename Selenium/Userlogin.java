package org.example;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class Userlogin {
    static void waitTime(int a ){
        try {
            Thread.sleep(a);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
    public static void main() {
        System.setProperty("webdriver.chrome.driver","C:\\browser driver\\chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        driver.get("http://localhost:5173/");
        driver.manage().window().maximize();
        WebElement btn = driver.findElement(By.id("startbtn"));
        waitTime(2000);
        btn.click();

        waitTime(2000);
        WebElement userSign= driver.findElement(By.id("userLogin"));
        userSign.click();

        waitTime(2000);
        WebElement userName= driver.findElement(By.id(":r1:"));
        userName.isDisplayed();
        userName.isEnabled();
        userName.sendKeys("userD@gamil.com");

        WebElement password= driver.findElement(By.id(":r3:"));
        password.isDisplayed();
        password.isEnabled();

        WebElement btn_Login = driver.findElement(By.id("btn_Login"));
        password.sendKeys("user@123");
        btn_Login.click();
        waitTime(2000);

        password.clear();
        password.sendKeys("userD@123");
        btn_Login.click();
        waitTime(3000);

        WebElement myCourses = driver.findElement(By.id("courses"));
        myCourses.click();
        waitTime(1500);

        WebElement allCourses = driver.findElement(By.id("courses"));
        allCourses.click();
        waitTime(1500);

        WebElement selinumCourse = driver.findElement(By.id("681398388528cbc8de346e68"));
        selinumCourse.click();
        waitTime(1500);

        myCourses = driver.findElement(By.id("courses"));
        myCourses.click();
        waitTime(3000);

        driver.close();

    }
}