import React, { useEffect, useState } from 'react';

const KLUCZ_API = '49572648-244b760dd68ba5459247b1359';
const KATEGORIE = ['racing', 'dogs', 'food'];

export default function GaleriaZdjęć() {
    const [kategoria, ustawKategorie] = useState(KATEGORIE[0]);
    const [obrazy, ustawObrazy] = useState([]);
    const [wybraneZdjęcie, ustawWybraneZdjęcie] = useState(null);

    useEffect(() => {
        pobierzObrazy(kategoria);
    }, [kategoria]);

    const pobierzObrazy = async (kategoria) => {
        try {
            const odpowiedź = await fetch(`https://pixabay.com/api/?key=${KLUCZ_API}&q=${kategoria}&image_type=photo&per_page=9`);
            const dane = await odpowiedź.json();
            ustawObrazy(dane.hits);
        } catch (błąd) {
            console.error("Błąd podczas pobierania obrazów", błąd);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ marginBottom: '20px' }}>
                {KATEGORIE.map((kat) => (
                    <button 
                        key={kat} 
                        onClick={() => ustawKategorie(kat)} 
                        style={{ 
                            margin: '5px', 
                            padding: '10px 15px', 
                            borderRadius: '8px', 
                            border: 'none', 
                            backgroundColor: kategoria === kat ? '#007bff' : '#ddd', 
                            color: kategoria === kat ? 'white' : 'black',
                            cursor: 'pointer'
                        }}
                    >
                        {kat}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
                {obrazy.map((img) => (
                    <div key={img.id} onClick={() => ustawWybraneZdjęcie(img.largeImageURL)} style={{ cursor: 'pointer', width: '30%', minWidth: '200px' }}>
                        <img src={img.previewURL} alt={img.tags} style={{ width: '100%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }} />
                    </div>
                ))}
            </div>
            {wybraneZdjęcie && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={wybraneZdjęcie} alt="Wybrane" style={{ maxHeight: '80%', borderRadius: '10px' }} />
                    <button onClick={() => ustawWybraneZdjęcie(null)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Zamknij</button>
                </div>
            )}
        </div>
    );
}
