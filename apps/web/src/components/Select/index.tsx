import SelectLabel from './Label';
import SelectOption from './Option';
import SelectPanel from './Panel';
import SelectRoot from './Root';

const Select = Object.assign(SelectRoot, {
  Option: SelectOption,
  Panel: SelectPanel,
  Label: SelectLabel,
});

export default Select;
