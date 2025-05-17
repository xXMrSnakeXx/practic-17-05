import { Link, useLocation } from 'react-router-dom';
import Grid from '../Grid/Grid';
import GridItem from '../GridItem/GridItem';

const CountryList = ({ countries }) => {
  const location = useLocation() 
  console.log('CountryList location ', location )
  return (
    <Grid>
      {countries.map(({ id, flag, country }) => (
        <Link key={id} to={`/country/${id}`} state={location}>
          <GridItem>
            <img src={flag} alt={country} />
          </GridItem>
        </Link>
      ))}
    </Grid>
  );
};
export default CountryList;
