import React from 'react';
import {useDispatch} from 'react-redux';
import { Multiselect } from "multiselect-react-dropdown";
import {setRegionId} from '../../state/app/actions';
import styles from './RegionSelector.module.css';

const regionOptions = [
  {ID: '0', label: '	U.S. city average'},
  {ID: '100', label: '	Northeast'},
  {ID: '110', label: '	New England'},
  {ID: '120', label: '	Middle Atlantic'},
  {ID: '200', label: '	Midwest'},
  {ID: '230', label: '	East North Central'},
  {ID: '240', label: '	West North Central'},
  {ID: '300', label: '	South'},
  {ID: '350', label: '	South Atlantic'},
  {ID: '360', label: '	East South Central'},
  {ID: '370', label: '	West South Central'},
  {ID: '400', label: '	West'},
  {ID: '480', label: '	Mountain'},
  {ID: '490', label: '	Pacific'},
  {ID: 'A104', label: '	Pittsburgh, PA'},
  {ID: 'A105', label: '	Buffalo-Niagara Falls, NY'},
  {ID: 'A106', label: '	Scranton, PA'},
  {ID: 'A210', label: '	Cleveland-Akron, OH'},
  {ID: 'A212', label: '	Milwaukee-Racine, WI'},
  {ID: 'A213', label: '	Cincinnati-Hamilton, OH-KY-IN'},
  {ID: 'A214', label: '	Kansas City, MO-KS'},
  {ID: 'A311', label: '	Washington-Baltimore, DC-MD-VA-WV'},
  {ID: 'A315', label: '	Washington, DC-MD-VA'},
  {ID: 'A317', label: '	Baltimore, MD'},
  {ID: 'A421', label: '	Los Angeles-Riverside-Orange County, CA'},
].sort((a,b) => a.label > b.label ? 1 : -1);

const RegionSelector = props => {
  const dispatch = useDispatch();
  const handleSelect = (_, selectedRegion) => {
    dispatch(setRegionId(selectedRegion.ID));
  };

  return (
    <div className={styles.root}>
      <div className={styles.label}>Available Regions:</div>
      <Multiselect
        options={regionOptions}
        placeholder="Select Region..."
        displayValue="label"
        id="ID"
        onSelect={handleSelect}
        singleSelect
      />
    </div>
  )
};

export default RegionSelector;