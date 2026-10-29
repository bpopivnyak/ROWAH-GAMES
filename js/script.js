const games = document.querySelector('#games')
const SUPABASE_API_URL = 'https://leyboxifijmwfjcqjukz.supabase.co/rest/v1/games'
const SUPABASE_ANON_KEY = 'sb_publishable_OqaR7Y8iJFURzTJGk0ODCg_6pBxrvSO'

async function fetchGames() {
    try{
        const response = await fetch(SUPABASE_API_URL, {

            method: 'GET',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        products = data || [];
        console.log('Завантажені товари:', products);
    } catch (error) {
        console.error('Помилка завантаження товарів:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchGames();
});