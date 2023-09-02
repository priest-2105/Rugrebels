import { db, auth } from '../../config/fire';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import useFetch from '../../../assets/hooks/usefetch';
import './paintingdetails.css';
import CurrencyAPI from '@everapi/currencyapi-js';  
import CurrencyConverter from '../../currency/currency';
import { collection, doc, getDoc, setDoc, query, where, getDocs } from 'firebase/firestore';




const Paintingdetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [painting, setPainting] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [rates, setRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const baseCurrency = 'USD';





  const currencyOptions = [
    { value: 'AED', label: 'United Arab Emirates Dirham' },
    { value: 'AFN', label: 'Afghan Afghani' },
    { value: 'ALL', label: 'Albanian Lek' },
    { value: 'AMD', label: 'Armenian Dram' },
    { value: 'ANG', label: 'NL Antillean Guilder' },
    { value: 'AOA', label: 'Angolan Kwanza' },
    { value: 'ARS', label: 'Argentine Peso' },
    { value: 'AUD', label: 'Australian Dollar' },
    { value: 'AWG', label: 'Aruban Florin' },
    { value: 'AZN', label: 'Azerbaijani Manat' },
    { value: 'BAM', label: 'Bosnia-Herzegovina Convertible Mark' },
    { value: 'BBD', label: 'Barbadian Dollar' },
    { value: 'BDT', label: 'Bangladeshi Taka' },
    { value: 'BGN', label: 'Bulgarian Lev' },
    { value: 'BHD', label: 'Bahraini Dinar' },
    { value: 'BIF', label: 'Burundian Franc' },
    { value: 'BMD', label: 'Bermudan Dollar' },
    { value: 'BND', label: 'Brunei Dollar' },
    { value: 'BOB', label: 'Bolivian Boliviano' },
    { value: 'BRL', label: 'Brazilian Real' },
    { value: 'BSD', label: 'Bahamian Dollar' },
    { value: 'BTN', label: 'Bhutanese Ngultrum' },
    { value: 'BWP', label: 'Botswanan Pula' },
    { value: 'BYN', label: 'Belarusian ruble' },
    { value: 'BYR', label: 'Belarusian Ruble' },
    { value: 'BZD', label: 'Belize Dollar' },
    { value: 'CAD', label: 'Canadian Dollar' },
    { value: 'CDF', label: 'Congolese Franc' },
    { value: 'CHF', label: 'Swiss Franc' },
    { value: 'CLF', label: 'Unidad de Fomento' },
    { value: 'CLP', label: 'Chilean Peso' },
    { value: 'CNY', label: 'Chinese Yuan' },
    { value: 'COP', label: 'Coombian Peso' },
    { value: 'CRC', label: 'Costa Rican Colón' },
    { value: 'CUC', label: 'Cuban Convertible Peso' },
    { value: 'CUP', label: 'Cuban Peso' },
    { value: 'CVE', label: 'Cape Verdean Escudo' },
    { value: 'CZK', label: 'Czech Republic Koruna' },
    { value: 'DJF', label: 'Djiboutian Franc' },
    { value: 'DKK', label: 'Danish Krone' },
    { value: 'DOP', label: 'Dominican Peso' },
    { value: 'DZD', label: 'Algerian Dinar' },
    { value: 'EGP', label: 'Egyptian Pound' },
    { value: 'ERN', label: 'Eritrean Nakfa' },
    { value: 'ETB', label: 'Ethiopian Birr' },
    { value: 'EUR', label: 'Euro' },
    { value: 'FJD', label: 'Fijian Dollar' },
    { value: 'FKP', label: 'Falkland Islands Pound' },
    { value: 'GBP', label: 'British Pound Sterling' },
    { value: 'GEL', label: 'Georgian Lari' },
    { value: 'GGP', label: 'Guernsey pound' },
    { value: 'GHS', label: 'Ghanaian Cedi' },
    { value: 'GIP', label: 'Gibraltar Pound' },
    { value: 'GMD', label: 'Gambian Dalasi' },
    { value: 'GNF', label: 'Guinean Franc' },
    { value: 'GTQ', label: 'Guatemalan Quetzal' },
    { value: 'GYD', label: 'Guyanaese Dollar' },
    { value: 'HKD', label: 'Hong Kong Dollar' },
    { value: 'HNL', label: 'Honduran Lempira' },
    { value: 'HRK', label: 'Croatian Kuna' },
    { value: 'HTG', label: 'Haitian Gourde' },
    { value: 'HUF', label: 'Hungarian Forint' },
    { value: 'IDR', label: 'Indonesian Rupiah' },
    { value: 'ILS', label: 'Israeli New Sheqel' },
    { value: 'IMP', label: 'Manx pound' },
    { value: 'INR', label: 'Indian Rupee' },
    { value: 'IQD', label: 'Iraqi Dinar' },
    { value: 'IRR', label: 'Iranian Rial' },
    { value: 'ISK', label: 'Icelandic Króna' },
    { value: 'JEP', label: 'Jersey pound' },
    { value: 'JMD', label: 'Jamaican Dollar' },
    { value: 'JOD', label: 'Jordanian Dinar' },
    { value: 'JPY', label: 'Japanese Yen' },
    { value: 'KES', label: 'Kenyan Shilling' },
    { value: 'KGS', label: 'Kyrgystani Som' },
    { value: 'KHR', label: 'Cambodian Riel' },
    { value: 'KMF', label: 'Comorian Franc' },
    { value: 'KPW', label: 'North Korean Won' },
    { value: 'KRW', label: 'South Korean Won' },
    { value: 'KWD', label: 'Kuwaiti Dinar' },
    { value: 'KYD', label: 'Cayman Islands Dollar' },
    { value: 'KZT', label: 'Kazakhstani Tenge' },
    { value: 'LAK', label: 'Laotian Kip' },
    { value: 'LBP', label: 'Lebanese Pound' },
    { value: 'LKR', label: 'Sri Lankan Rupee' },
    { value: 'LRD', label: 'Liberian Dollar' },
    { value: 'LSL', label: 'Lesotho Loti' },
    { value: 'LTL', label: 'Lithuanian Litas' },
    { value: 'LVL', label: 'Latvian Lats' },
    { value: 'LYD', label: 'Libyan Dinar' },
    { value: 'MAD', label: 'Moroccan Dirham' },
    { value: 'MDL', label: 'Moldovan Leu' },
    { value: 'MGA', label: 'Malagasy Ariary' },
    { value: 'MKD', label: 'Macedonian Denar' },
    { value: 'MMK', label: 'Myanma Kyat' },
    { value: 'MNT', label: 'Mongolian Tugrik' },
    { value: 'MOP', label: 'Macanese Pataca' },
    { value: 'MRO', label: 'Mauritanian ouguiya' },
    { value: 'MUR', label: 'Mauritian Rupee' },
    { value: 'MVR', label: 'Maldivian Rufiyaa' },
    { value: 'MWK', label: 'Malawian Kwacha' },
    { value: 'MXN', label: 'Mexican Peso' },
    { value: 'MYR', label: 'Malaysian Ringgit' },
    { value: 'MZN', label: 'Mozambican Metical' },
    { value: 'NAD', label: 'Namibian Dollar' },
    { value: 'NGN', label: 'Nigerian Naira' },
    { value: 'NIO', label: 'Nicaraguan Córdoba' },
    { value: 'NOK', label: 'Norwegian Krone' },
    { value: 'NPR', label: 'Nepalese Rupee' },
    { value: 'NZD', label: 'New Zealand Dollar' },
    { value: 'OMR', label: 'Omani Rial' },
    { value: 'PAB', label: 'Panamanian Balboa' },
    { value: 'PEN', label: 'Peruvian Nuevo Sol' },
    { value: 'PGK', label: 'Papua New Guinean Kina' },
    { value: 'PHP', label: 'Philippine Peso' },
    { value: 'PKR', label: 'Pakistani Rupee' },
    { value: 'PLN', label: 'Polish Zloty' },
    { value: 'PYG', label: 'Paraguayan Guarani' },
    { value: 'QAR', label: 'Qatari Rial' },
    { value: 'RON', label: 'Romanian Leu' },
    { value: 'RSD', label: 'Serbian Dinar' },
    { value: 'RUB', label: 'Russian Ruble' },
    { value: 'RWF', label: 'Rwandan Franc' },
    { value: 'SAR', label: 'Saudi Riyal' },
    { value: 'SBD', label: 'Solomon Islands Dollar' },
    { value: 'SCR', label: 'Seychellois Rupee' },
    { value: 'SDG', label: 'Sudanese Pound' },
    { value: 'SEK', label: 'Swedish Krona' },
    { value: 'SGD', label: 'Singapore Dollar' },
    { value: 'SHP', label: 'Saint Helena Pound' },
    { value: 'SLL', label: 'Sierra Leonean Leone' },
    { value: 'SOS', label: 'Somali Shilling' },
    { value: 'SRD', label: 'Surinamese Dollar' },
    { value: 'STD', label: 'São Tomé and Príncipe dobra' },
    { value: 'SVC', label: 'Salvadoran Colón' },
    { value: 'SYP', label: 'Syrian Pound' },
    { value: 'SZL', label: 'Swazi Lilangeni' },
    { value: 'THB', label: 'Thai Baht' },
    { value: 'TJS', label: 'Tajikistani Somoni' },
    { value: 'TMT', label: 'Turkmenistani Manat' },
    { value: 'TND', label: 'Tunisian Dinar' },
    { value: 'TOP', label: 'Tongan Paʻanga' },
    { value: 'TRY', label: 'Turkish Lira' },
    { value: 'TTD', label: 'Trinidad and Tobago Dollar' },
    { value: 'TWD', label: 'New Taiwan Dollar' },
    { value: 'TZS', label: 'Tanzanian Shilling' },
    { value: 'UAH', label: 'Ukrainian Hryvnia' },
    { value: 'UGX', label: 'Ugandan Shilling' },
    { value: 'USD', label: 'US Dollar' },
    { value: 'UYU', label: 'Uruguayan Peso' },
    { value: 'UZS', label: 'Uzbekistan Som' },
    { value: 'VEF', label: 'Venezuelan Bolívar' },
    { value: 'VND', label: 'Vietnamese Dong' },
    { value: 'VUV', label: 'Vanuatu Vatu' },
    { value: 'WST', label: 'Samoan Tala' },
    { value: 'XAF', label: 'CFA Franc BEAC' },
    { value: 'XAG', label: 'Silver Ounce' },
    { value: 'XAU', label: 'Gold Ounce' },
    { value: 'XCD', label: 'East Caribbean Dollar' },
    { value: 'XDR', label: 'Special drawing rights' },
    { value: 'XOF', label: 'CFA Franc BCEAO' },
    { value: 'XPF', label: 'CFP Franc' },
    { value: 'YER', label: 'Yemeni Rial' },
    { value: 'ZAR', label: 'South African Rand' },
    { value: 'ZMK', label: 'Zambian Kwacha' },
    { value: 'ZMW', label: 'Zambian Kwacha' },
    { value: 'ZWL', label: 'Zimbabwean dollar' },
    { value: 'XPT', label: 'Platinum Ounce' },
    { value: 'XPD', label: 'Palladium Ounce' },
    { value: 'BTC', label: 'Bitcoin' },
    { value: 'ETH', label: 'Ethereum' },
    { value: 'BNB', label: 'Binance' },
    { value: 'XRP', label: 'Ripple' },
    { value: 'SOL', label: 'Solana' },
    { value: 'DOT', label: 'Polkadot' },
    { value: 'AVAX', label: 'Avalanche' },
    { value: 'MATIC', label: 'Matic Token' },
    { value: 'LTC', label: 'Litecoin' },
    { value: 'ADA', label: 'Cardano' },
  ];


    useEffect(() => {
      const currencyApi = new CurrencyAPI('cur_live_z9MRKPZZ0E1c9hWDPM39EKEzJVAC3DZPvtp7BOiD');

    // Fetch exchange rates and update rates state
    currencyApi
      .latest({
        base_currency: baseCurrency,
        currencies: targetCurrency,
      })
      .then((response) => {
        setRates(response.data);
        setRate(response.data[targetCurrency]?.value);
      })
      .catch((error) => {
        console.error('Error fetching exchange rates:', error);
      });

    fetchPainting();
  }, [id, baseCurrency, targetCurrency]);

      const fetchPainting = async () => {
        if (!id) return;
        try {
          const paintingDocRef = doc(db, 'paintings', id);
          const paintingDocSnap = await getDoc(paintingDocRef);
          if (paintingDocSnap.exists()) {
            const paintingData = paintingDocSnap.data();
            setPainting(paintingData);
          } else {
            console.log('Painting not found');
          }
        } catch (error) {
          console.error('Error fetching painting:', error);
        }
      };


    

const calculateConvertedPrice = (basePriceUSD, targetCurrency) => {
  try {
    if (!rates || Object.keys(rates).length === 0 || !rates[targetCurrency]) {
      return null; // Return early if rates are not available
    }

    const exchangeRate = rates[targetCurrency].value;

    if (exchangeRate !== undefined) {
      return (basePriceUSD * exchangeRate).toFixed(2);
    } else {
      throw new Error('Exchange rate not available');
    }
  } catch (error) {
    console.error('Error calculating converted price:', error.message);
    return null;
  }
};
  

const handleAddToCart = async (painting) => {
  if (!painting) {
    console.error('Painting data is not available');
    return;
  } if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const cartRef = collection(db, 'carts', userId, 'items');
  
      const q = query(cartRef, where('paintingId', '==', painting.id));
      const querySnapshot = await getDocs(q);
  
      console.log('Fetched cart items:',
      //  querySnapshot.docs.map(doc => doc.data())
       );
  
      if (querySnapshot.empty) {
        const basePriceUSD = painting.price;
        const exchangeRate = rates[baseCurrency]?.value;
  
        if (exchangeRate !== undefined) {
          const convertedPrice = calculateConvertedPrice(painting.price, selectedCurrency);
  
          try {
            await setDoc(doc(cartRef), {
              userId: auth.currentUser.uid, 
              paintingId: painting.id,
              paintingTitle: painting.title,
              paintingImage: painting.img,
              paintingdescription: painting.about,
              paintingPrice: convertedPrice,
              targetCurrency: selectedCurrency,
              paintingDate: painting.date,
              paintingArtist: painting.artist,
            });
  
            console.log('Item added to cart:',
            //  painting.id
             );
            setIsAdded(true);
  
            setTimeout(() => {
              setIsAdded(false);
            }, 3000); // Reset after 3 seconds
          } catch (error) {
            console.error('Error adding item to cart:', error.message);
          }
        } else {
          console.error('Exchange rate not available');
        }
      } else {
        console.log('Item is already in the cart');
      }
    } else {
      console.log('User is not authenticated');
    }
  };

  const prevbutton = () => {
    history.push("/shop");
  };

  return (
    <div className='painting-details'>
      <button className='prevbutton' onClick={prevbutton}><i className="bi bi-arrow-left-square-fill"></i></button> 
      {/* { error && <div>{ error }</div>} */}

      {/* { preloader && <div className='preloader'>...Loading </div> } */}

      { painting && (
        <div className='painting-detail-container'>
          <div className="backlinks">
            <Link to='/'>Home</Link>
            /<Link to='/shop'>Shop</Link>  
            /<Link className='disabled' to='/'>{painting.title}</Link>
          </div>
          <div className='painting-detail'>
            <img src={painting.img} alt="painting" />
            <div className="product-description ms-4">
              <h2>{painting.title}</h2>

  
            <select value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
                {currencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.value} - {option.label}
                  </option>
                ))}
              </select>

              <h4>
                {calculateConvertedPrice(painting.price, selectedCurrency)} {selectedCurrency}
                </h4>


              
              <div className="buttons">
                <div  className="quantity">
                  <span>Quantity</span>
                  <select className='ms-2 pe-4 ps-4 pt-2 pb-2' name="quantityselect" id="quantityselect">  
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <button onClick={() => handleAddToCart(painting)}>Add to Cart</button>
                <button>Buy Now</button>
              </div>

            <div className="accordion" id="accordionPanelsStayOpenExample">
      <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Description
        </button>
      </h2>
      <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div className="accordion-body about-product">
        <p>{painting.about}</p>
            </div>
      </div>
      </div>
      <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
        Return Policy
        </button>
      </h2>
      <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
        <div className="accordion-body"> 
      I’m a Return and Refund policy. I’m a great place to let your customers know what to do in case they are
      dissatisfied with their purchase. Having a straightforward refund or exchange policy 
      is a great way to build trust and reassure your customers that they can buy with confidence.
            </div>
      </div>
      </div> 
      </div>
            </div>
          </div>

          {isAdded && (
            <div className="popup">
              Item added to cart!
              <button onClick={() => setIsAdded(false)}>Close</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Paintingdetails;