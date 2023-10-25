import { appData, redrawSite } from "../appContext";
import axios from 'axios';

export const PostSkill = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const formElem = document.querySelector<HTMLInputElement>('.postSkill form');
		const displayElem = document.querySelector<HTMLDivElement>('.postSkill .display');

		if (formElem && displayElem) {
			formElem.addEventListener('submit', async (e) => {
				e.preventDefault();
				const formElem = e.target as HTMLFormElement;
				const formData = new FormData(formElem);

				const skill: any = {};
				for (const [key, value] of formData.entries()) {
					skill[key] = value;
				}

				const headers = {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json'
				};

				const response = await axios.post(`${baseUrl}/skills`,
					JSON.stringify(skill), { headers });

				if (response.status === 201) {
					const newSkill = await response.data;
					displayElem.innerHTML = `
						<div class="skill">
							<div>skill with ID ${newSkill.id} was created.</div>	
						</div>
					`;
					redrawSite();
				} else {
					displayElem.innerHTML = `
						<div class="error">skill could not be created.</div>
					`
				}
			})
		}

	})

	return /*html*/ `
		<style>
			.postSkill .skillId {
				width: 2rem;
				margin-right: .3rem;
				text-align: right;
			}
			.postSkill input {
				width: 98%;
			}
		</style>
	 	<fieldset class="skillComponent postSkill">
			<legend>Post Skill <span>(with axios)</span></legend>
			<form>
				<div>ID-Code: <input class="idCode" name="idCode"/></div>
				<div>Name: <input class="name" name="name"/></div>
				<div>URL: <input class="url" name="url"/></div>
				<div>Description: <input class="description" name="description"/></div>
				<div><button>Create</button></div>

			</form>
			<div class="display"></div>
		</fieldset>
	`
}