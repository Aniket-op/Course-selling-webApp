package org.example;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.concurrent.TimeUnit;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;


public class Addcourses {
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
        WebElement adminSign= driver.findElement(By.id("adminSignin"));
        adminSign.click();

        waitTime(2000);
        WebElement userName= driver.findElement(By.id(":r1:"));
        userName.isDisplayed();
        userName.isEnabled();
        userName.sendKeys("tiet@gamil.com");

        WebElement password= driver.findElement(By.id(":r3:"));
        password.isDisplayed();
        password.isEnabled();
        WebElement btn_Login = driver.findElement(By.id("btn_Login"));
        password.sendKeys("wrongpass");
        btn_Login.click();

        waitTime(1000);
        password.clear();
        password.sendKeys("correctpass");
        btn_Login.click();
        waitTime(2000);

        WebElement addCourses = driver.findElement(By.id("courses"));
        addCourses.click();
        waitTime(1000);

        WebElement title = driver.findElement(By.id(":r5:"));
        WebElement description = driver.findElement(By.id(":r7:"));
        WebElement price = driver.findElement(By.id(":r9:"));
        WebElement url = driver.findElement(By.id(":rb:"));

        title.isDisplayed();
        title.isEnabled();
        title.sendKeys("New Selenium code Course");

        description.isDisplayed();
        description.isEnabled();
        description.sendKeys("Selenium automates browsers. In these tutorials we will learn how to automate web applications by using Selenium tool from scratch . This course will cover Selenium components Selenium IDE, Selenium Web Driver in detail along with the examples . And we also learn Core Java which is very important for Selenium web driver. By end of selenium tutorial course you should write automated test cases using Selenium.\n" +
                "\n" +
                "This course is designed from very basics so you do not need any prerequisites to start learning Selenium here. And all the concepts will be discussed with the practical examples.\n" +
                "\n" +
                "Automation testing using Selenium WebDriver is popular in IT industry now and you will learn this automation testing with the help of these videos");

        price.isDisplayed();
        price.isEnabled();
        price.sendKeys("5000");

        url.isDisplayed();
        url.isEnabled();
        url.sendKeys("https://img-c.udemycdn.com/course/750x422/4166416_66ba_5.jpg");

        WebElement btn_createCourses = driver.findElement(By.id("createCourses"));
        btn_createCourses.click();

        waitTime(3000);

        WebElement viewCourses = driver.findElement(By.id("courses"));
        viewCourses.click();
        waitTime(3000);

        driver.close();

    }
}
