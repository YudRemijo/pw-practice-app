import {test, expect} from '@playwright/test'
import {PageManager} from "../page-object/pageManager";
import { faker, Faker } from '@faker-js/faker';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navegar no menu', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption(randomEmail, 'Welcome1',"option 2")
    await page.screenshot({path: 'screenshots/formsLayout.png'})
})
