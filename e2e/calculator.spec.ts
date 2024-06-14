import { test, expect } from '@playwright/test';

test.describe('Calculator', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173/');
    });

    // Ce test vérifie que la calculette affiche le résultat de l'addition de 1 et 2.
    // Le test va échouer car le calculatrice ne fonctionne pas correctement.
    test('should perform addition correctly', async ({ page }) => {
        await page.click('button:has-text("1")');
        await page.click('button:has-text("sum")');
        await page.click('button:has-text("2")');
        await page.click('.btnEqual');
        await expect(page.locator('.screen')).toContainText('3');
    });

    // Ce test vérifie que le bouton C remet bien la calculette à 0
    // Il échoue mais je n'ai pas trouvé pourquoi car quand je le fait moi même le bouton remet bien à 0
    test('should reset the display', async ({ page }) => {
        await page.click('button:has-text("5")');
        await page.click('button:has-text("C")');
        await expect(page.locator('.screen')).toContainText('0');
    });

    // Ce test vérifie que le bouton = est bien de couleur rouge
    // Ce test fonctionne sans problème
    test('background bouton "=" red', async ({ page }) => {
        const color = await page.evaluate(() => {
            const button = document.querySelector('.btnEqual');
            return getComputedStyle(button).backgroundColor;
        });
        expect(color).toBe('rgb(255, 0, 0)');
    });
});
