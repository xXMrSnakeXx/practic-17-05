import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { fetchByRegion } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import CountryList from '../components/CountryList/CountryList';

const SearchCountry = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
 const [searchParams, setSearchParams] = useSearchParams()

const region = searchParams.get("region")

  useEffect(() => {
    if(!region) return
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [region]);


  const handleSubmit = value =>{
    setSearchParams({region: value})
  }

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={handleSubmit}/>
        {countries.length > 0 && <CountryList countries={countries} />}
        {isLoading && <Loader />}
        {isError && <Heading title="Oops! Something went wrong..." bottom />}
      </Container>
    </Section>
  );
};

export default SearchCountry;
