import { appData } from "../appContext";
import { ISkill } from "../interface";

export const GetSkill = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const skillIdElem = document.querySelector<HTMLInputElement>('.getSkill .skillId');
		const buttonElem = document.querySelector<HTMLInputElement>('.getSkill button');
		const displayElem = document.querySelector<HTMLDivElement>('.getSkill .display');

		if (skillIdElem && buttonElem && displayElem) {
			buttonElem.addEventListener('click', async (e) => {
				e.preventDefault();
				const skillId = skillIdElem.value;
				const response = await fetch(`${baseUrl}/skills/${skillId}`);
				const skill: ISkill = await response.json();
				if (response.status === 200) {
					displayElem.innerHTML = `
						<div class="skill">
							<div>${skill.name} (${skill.idCode})</div>	
							<div>${skill.description}</div>	
						</div>
					`
				} else {
					displayElem.innerHTML = `
						<div class="error">skill not found.</div>
					`
				}
			})
		}
	})

	return /*html*/ `
		<style>
			.getSkill .skillId {
				width: 2rem;
				text-align: right;
			}
			.getSkill .skill {
				margin-top: 1rem;
			}
		</style>
	 	<fieldset class="skillComponent getSkill">
			<legend>Get Skill <span>(with axios)</span></legend>
			<form>
			Skill ID: <input class="skillId" value="0"/><button>Search</button>	
			</form>
			<div class="display"></div>
		</fieldset>
	`
}