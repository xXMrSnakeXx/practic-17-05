import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { getCountries } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import CountryList from '../components/CountryList/CountryList';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <Section>
      <Container>
        {countries.length > 0 && <CountryList countries={countries} />}
        {isLoading && <Loader />}
        {isError && <Heading title="Oops! Something went wrong..." bottom />}
      </Container>
    </Section>
  );
};
export default Home;
