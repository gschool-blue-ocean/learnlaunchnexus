import React from "react";

const Modal = ({ isOpen, content, onClose }) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "rgba(0, 0, 0, 0.7)",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				paddingBottom: "150px",
				fontFamily: "Roboto, Sans-serif",
			}}
		>
			<div
				style={{
					backgroundColor: "#fff",
					padding: "30px",
					borderRadius: "8px",
					width: "400px",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					lineHeight: "20px",
				}}
			>
				{content}
				<button
					style={{ marginTop: "10px", marginBottom: "10px" }}
					onClick={onClose}
				>
					Close
				</button>{" "}
				{/* Add margin to the button */}
			</div>
		</div>
	);
};

export default Modal;
