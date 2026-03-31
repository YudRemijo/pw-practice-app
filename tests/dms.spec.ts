import {test, expect} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:2520/')
})

test.describe('Orçamento por Fases', () => {
    test.beforeEach( async ({page}) => {
    })

    test('Orçamento por fases', async({page}) =>{
        
    })
})