import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

    

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
       
        await this.selectGroupTitle('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumber01Seconds(2)
    }

    async datePickerPage() {
     
        await this.selectGroupTitle('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('DatePicker').click()

    }

    async smartTablePage() {
        
        await this.selectGroupTitle('Tables & Data')
        await this.page.waitForTimeout(1000)

        await this.page.getByText('Smart Table').click()

    }

    async toastrPage() {
        
        await this.selectGroupTitle('Modal & Overlays')
        await this.page.waitForTimeout(1000)

        await this.page.getByTitle('Toastr').click()
    }

    async tooltipPage() {

        await this.selectGroupTitle('Modal & Overlays')
        await this.page.waitForTimeout(1000)

        await this.page.getByTitle('Tooltip').click()
    }

    private async selectGroupTitle(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == 'false')
            await groupMenuItem.click()
        
    }
}