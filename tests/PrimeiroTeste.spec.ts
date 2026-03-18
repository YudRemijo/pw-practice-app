import {test, expect} from '@playwright/test'
import { basename } from 'path'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Localização Syntax Regras', async({page}) => {
    //by Tag name
    page.locator('input')

    //by ID
    await page.locator('#inputEmail1').click()

    //by Class
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')

    //by class full
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine diferent selectors
    page.locator('input[placeholder="Email"]')

    //by XPATH (Não recomendado, mas funciona.)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator('Using')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test('Face de usuário locator', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('') //DEFINIDO NO CÓDIGO FONTE
})

test('elementos filhos locator', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('elementos parent locator', async({page}) => {
    await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()

    await page.locator('nb-card').filter({hasText:"Basic form"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText:"Sign in"}).getByRole('textbox', {name: "Email"}).click()

    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()
    
})

test('Reutilizar locators', async({page}) => {
    const BasicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = BasicForm.getByRole('textbox', {name:"Email"})

    await emailField.fill('test@test.com')
    await BasicForm.getByRole('textbox', {name:"Password"}).fill('Welcome123')
    await BasicForm.locator('nb-checkbox').click()
    await BasicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('extrair valores', async({page}) => {
    //SINGLE TEST VALUE
    const BasicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await BasicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text value
    const allRadioButtonsLabels= await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain('Option 1')

    //INPUT VALE
    const emailField = BasicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue() //inputValue para obter um valor de campo de entrada.
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue= await emailField.getAttribute('placeholder')
    expect (placeholderValue).toEqual('Email')
}) 

test('assertions', async({page}) => {
    const BasicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    const text = await BasicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertions
    await expect(BasicFormButton).toHaveText('Submit')

    //soft assertion --só recomendado para quando quiser seguir capturando as validações após o primeiro falhar
    await expect.soft(BasicFormButton).toHaveText('Submit')
    await BasicFormButton.click()

})