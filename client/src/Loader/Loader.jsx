import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./Loader.module.css";

const Loader = () => {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => document.body.classList.remove("overflow-hidden");
	}, []);
	return createPortal(
		<div className={style.ldsRingWrapper}>
			<div className={style.positionClass}>
				<div className={style.ldsRing}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</div>,
		document.getElementById("portal")
	);
};

export default Loader;
