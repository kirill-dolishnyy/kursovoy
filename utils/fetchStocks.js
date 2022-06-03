const fetchStockPrice = async (stockTickerSymbol) => {

  const response = await fetch("http://188.244.38.250:5000/multiplicators?tiker="+stockTickerSymbol);
  const result = await response.json();
  let name = result['name']
  let tiker = result['tiker']
  let pe = result['P/E']
  let ps = result['P/S']
  let pbv = result['P/BV']
  let evebitda = result['EV/EBITDA']
  let debt = result['Долг/EBITDA']
  let sector = result['sector']
  
  return {
    stockName: name,
    Sector: sector,
    stockTicker: tiker,
    Pe: pe,
    Ps:ps,
    Pbv:pbv,
    Evebitda:evebitda,
    Debt:debt
  }
};

export default fetchStockPrice;