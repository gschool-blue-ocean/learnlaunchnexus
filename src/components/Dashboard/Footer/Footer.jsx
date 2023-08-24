import { useState } from "react";
import Modal from "./FooterModal/FooterModal.jsx";
import "./Footer.css";

const Footer = () => {
	const [openModal, setOpenModal] = useState(null);

	const handleLinkClick = (e, content) => {
		setOpenModal(content);
		e.preventDefault();
	};

	const handleCloseModal = () => {
		setOpenModal(null);
	};
	const text1 =
		"This is a blue Ocean Project, Made by the team PROJECT HIRE HUNT - PATRICK, JOEY, SEAN, BEN, PEDRO";
	const text2 = "The phone number to our office is 111-111-1111";
	const text3 = `
  Welcome to our platform. By accessing or using our services, you agree to abide by these terms. 
  Our services are provided "as is," and we're not responsible for any disruptions or inaccuracies. 
  You must be of legal age to use our services. Any content you submit remains your responsibility,
   and you grant us a non-exclusive license to use it. Prohibited activities include unauthorized access,
    data mining, and unlawful content. We may modify or terminate our services at any time. Your use constitutes
     acceptance of any updates. We respect your privacy; our Privacy Policy outlines data collection and usage. 
     We're not liable for third-party links. Use our services responsibly.
  `;

	return (
		<>
			<div className='footer'>
				<ul className='footer-links'>
					<li>
						<a href='#' onClick={(e) => handleLinkClick(e, text1)}>
							About us
						</a>
					</li>
					<li>
						<a href='#' onClick={(e) => handleLinkClick(e, text2)}>
							Contact us
						</a>
					</li>
					<li>
						<a href='#' onClick={(e) => handleLinkClick(e, text3)}>
							Terms of Service
						</a>
					</li>
				</ul>
			</div>
			<Modal
				isOpen={openModal !== null}
				content={openModal}
				onClose={handleCloseModal}
			/>
		</>
	);
};

export default Footer;
