import React, {useState} from 'react';
import styles from './Header.module.css';
import settings from './settings-gear.svg'
import ChangeDesiredLocation from './changeDesiredLocation/ChangeDesiredLocation';
import ChangeEmail from './changeEmail/ChangeEmail';
import ChangeLocation from './changeLocation/ChangeLocation';
import AddAdmin from './addAdmin/AddAdmin';
import DeleteAdmin from './deleteAdmin/DeleteAdmin';
import SettingModal from './SettingModal';

const SettingDropdown = ({admin, setClose}) => {

    const [openModal, setOpenModal] = useState(null);

    const handleLinkClick = (e, content) => {
        if(content === 'changeEmail'){
          setOpenModal(<ChangeEmail />)
        }
        else if(content === 'addAdmin') {
          setOpenModal(<AddAdmin />);
        }
        else if(content === 'deleteAdmin') {
          setOpenModal(<DeleteAdmin />);
        }
        else if(content === 'changeLocation') {
          setOpenModal(<ChangeLocation />);
        }
        else if(content === 'changeDesiredLocation'){
          setOpenModal(<ChangeDesiredLocation />);
        }
        else {
            return
        }
        e.preventDefault()
      };

      const handleCloseModal = () => {
        setOpenModal(null);
        setClose(false)
      };

    if(admin === true) {
        return (
            <div className={styles.settingDropdown}>
                <img className={styles.id} src={settings}></img>
                <div className={styles.settingDropdownList}>
                    <a onClick={(e) => handleLinkClick(e, 'changeEmail')} className={styles.settingDropdownItem} >Change Email</a>
                    <a onClick={(e) => handleLinkClick(e, 'addAdmin')} className={styles.settingDropdownItem} >Add Admin</a>
                    <a onClick={(e) => handleLinkClick(e, 'deleteAdmin')} className ={styles.settingDropdownItem} >Remove Admin</a>
                </div>
                <SettingModal
                    isOpen={openModal !== null}
                    content={openModal}
                    onClose={handleCloseModal}
                />
            </div>
        )
    }


        return (
            <div className={styles.settingDropdown}>
                <img className={styles.id} src={settings}></img>
                <div className={styles.settingDropdownList}>
                    <a onClick={(e) => handleLinkClick(e, 'changeEmail')} className={styles.settingDropdownItem}>Change Email</a>
                    <a  onClick={(e) => handleLinkClick(e, 'changeLocation')} className={styles.settingDropdownItem}>Change Location</a>
                    <a onClick={(e) => handleLinkClick(e, 'changeDesiredLocation')} className={styles.settingDropdownItem}>Change Desired Location</a>
                </div>
                <SettingModal
                    isOpen={openModal !== null}
                    content={openModal}
                    onClose={handleCloseModal}
                />
            </div>
        )
    
}


export default SettingDropdown