import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)//mais 2 segundos para todos os testes
})

test('Auto Waiting', async({page}) => {
    const successButton = page.locator('.bg-success')

    //await sucessButton.click()

    // const text = await sucessButton.textContent()
    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()

    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //___ wait for element
    // await page.waitForSelector('.bg-success')

    //___ wait for particlular responde
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___ wait for network calls to be completed (not recommended)
    await page.waitForLoadState('networkidle')


    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')
})

test('limite de tempo', async({page}) => {
    // test.setTimeout(10000)
    test.slow()//multiplca o tempo em 3x do globaltimeout
    const successButton = page.locator('.bg-success')
    await successButton.click()
})