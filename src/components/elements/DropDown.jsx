import { styled } from "@mui/material/styles";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';;



const DropDown = ({ value, handleChange, items }) => {

    const useStyles = styled(() => ({
        formControl: {
            "& .MuiInputBase-root": {
                color: "#6EC177",
                borderColor: "#6EC177",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "100px",
                minWidth: "120px",
                justifyContent: "center"
            },
            "& .MuiSelect-select.MuiSelect-select": {
                paddingRight: "0px"
            }
        },
        select: {
            width: "auto",
            fontSize: "12px",
            "&:focus": {
                backgroundColor: "transparent"
            }
        },
        selectIcon: {
            position: "relative",
            color: "#6EC177",
            fontSize: "14px"
        },
        paper: {
            borderRadius: 12,
            marginTop: 8
        },
        list: {
            paddingTop: 0,
            paddingBottom: 0,
            "& li": {
                fontWeight: 200,
                paddingTop: 8,
                paddingBottom: 8,
                fontSize: "12px"
            },
            "& li.Mui-selected": {
                color: "white",
                background: "#6EC177"
            },
            "& li.Mui-selected:hover": {
                background: "#6EC177"
            }
        }
    }));



    const classes = useStyles();

    const menuProps = {
        classes: {
            list: classes.list,
            paper: classes.paper
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "center"
        },
        getContentAnchorEl: null
    };

    return (
        <FormControl className={classes.formControl}>
            <Select
                value={value}
                onChange={handleChange}
                disableUnderline
                IconComponent={ExpandMoreIcon}
                MenuProps={menuProps}
                classes={{
                    select: classes.select,
                    icon: classes.selectIcon
                }}
            >
                {items.map((item) => (
                    <MenuItem key={item.key} value={item.value}>
                        {item.key}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default DropDown;
