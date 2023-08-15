import React, {useState} from 'react';
import { settingItemsStudent } from './settingItemsStudent';
import { settingItemsAdmin } from './settingItemsAdmin';
import styles from './Header.module.css';
import settings from './settings-gear.svg'

const SettingDropdown = ({admin}) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (menu) => {
        setSelectedOption(menu);
    }
    
    if(admin === true) {
        return (
            <div className={styles.settingDropdown}>
                <img className={styles.id} src={settings}></img>
                <div className={styles.settingDropdownList}>
                    {settingItemsAdmin.map((menu, index) => (
                        <a key={index} className={styles.settingDropdownItem} onClick={() => handleSelect(menu)} href={menu.url}>{menu.title}</a>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className={styles.settingDropdown}>
            <img className={styles.id} src={settings}></img>
            <div className={styles.settingDropdownList}>
                {settingItemsStudent.map((menu, index) => (
                    <a key={index} className={styles.settingDropdownItem} onClick={() => handleSelect(menu)} href={menu.url}>{menu.title}</a>
                ))}
            </div>
        </div>
    )
    
}


export default SettingDropdown