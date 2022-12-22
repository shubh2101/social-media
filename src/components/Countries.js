const getCountries = async () => {
  const url = "https://restcountries.com/v3.1/all";
  const getData = await fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error(`${"Something went wrong."} 😞 (${response.status})`);
    }
    return response.json();
  });

  let countries = [];
  getData.forEach((country) => {
    countries.push(country.name.common);
  });
  return countries;
};

export default getCountries;
