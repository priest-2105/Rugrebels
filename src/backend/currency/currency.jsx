import React, { useState, useEffect } from 'react';
import CurrencyAPI from '@everapi/currencyapi-js';

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



const CurrencyConverter = ({ basePriceUSD, baseCurrency, targetCurrency }) => {

    const [selectedTargetCurrency, setSelectedTargetCurrency] = useState('EUR');
    const [rates, setRates] = useState({});
    const [rate, setRate] = useState(null);
    
    useEffect(() => {
      const currencyApi = new CurrencyAPI('cur_live_pnom20wPBhKiLIEmcIH95Yo50udzIGyJDGd6F3Mp');
      currencyApi.latest({
        base_currency: baseCurrency,
        currencies: targetCurrency,
      }).then((response) => {
        setRates(response.data);
        setRate(response.data[targetCurrency]?.value);
      });
    }, [baseCurrency, targetCurrency]);
    
    // Calculate converted price only if rate is available
    const convertedPrice = rate !== null ? (basePriceUSD * rate).toFixed(2) : null;
  
  


  return (
    <div className="mx-auto w-full max-w-sm bg-white shadow rounded-md p-5 space-y-3 text-sm">
      <div className="flex items-center justify-between space-x-5">
        <input
          type="hidden"
          id="base_currency_input"
          name="base_currency"
          value={baseCurrency}
          readOnly
          className="border-slate-300 border rounded-md py-2 px-4 text-sm"
        />
      </div>
      <div className="flex items-center justify-between space-x-5">
        <label htmlFor="target_currency_select">Target currency:</label>
        <select
  id="target_currency_select"
  name="target_currency"
  value={selectedTargetCurrency}
  onChange={(e) => setSelectedTargetCurrency(e.target.value)}
  className="border-slate-300 border rounded-md py-2 px-4 text-sm"
>
  {currencyOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.value} - {option.label}
    </option>
  ))}
</select>
      </div>

      <strong>Price in {targetCurrency}:</strong>{" "}
    {rate !== null ? (basePriceUSD * rate).toFixed(2) : "Loading..."}
      {rate !== null && (
        <div className="latest-rates">
          <div className="rate">
            <strong>{targetCurrency}:</strong> {rate}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
