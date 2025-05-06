package org.example;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class SerachCourses
{
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

//        My courses
        WebElement myCourses = driver.findElement(By.id("courses"));
        myCourses.click();
        waitTime(1500);


        myCourses = driver.findElement(By.id("courses"));
        myCourses.click();
        waitTime(1500);


        WebElement searchBar = driver.findElement(By.id("search"));
        searchBar.sendKeys("selinum");

        WebElement searchBtn = driver.findElement(By.id("search_btn"));
        searchBtn.click();
        waitTime(3000);

        searchBar.clear();
        searchBar.sendKeys("hamster");
        searchBtn.click();
        waitTime(3000);

//        add buy courses
        WebElement seleniumCourse = driver.findElement(By.xpath("//button[@name='buy_btn']"));
        seleniumCourse.click();

        myCourses = driver.findElement(By.id("courses"));
        myCourses.click();
        waitTime(3000);

// view courses
        WebElement view = driver.findElement(By.xpath("//button[@name='view']"));
        view.click();
        waitTime(3000);
        WebElement close = driver.findElement(By.xpath("//button[@name='close']"));
        close.click();
        waitTime(3000);
        driver.close();
    }
}
