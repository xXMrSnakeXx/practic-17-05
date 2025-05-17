import { useEffect, useRef, useState } from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Section from '../components/Section/Section';
import { fetchCountry } from '../service/countryApi';
import Loader from '../components/Loader/Loader';
import { useLocation, useParams } from 'react-router-dom';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';

const Country = () => {
  const [country, setCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const { countryId } = useParams();
  const location = useLocation();
  console.log('Country location ', location);
  const goBack = useRef(location?.state ?? '/');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        setIsError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn path={goBack.current} />
        {country && <CountryInfo {...country} />}
        {isLoading && <Loader />}
        {isError && <Heading title="Oops! Something went wrong..." bottom />}
      </Container>
    </Section>
  );
};

export default Country;
