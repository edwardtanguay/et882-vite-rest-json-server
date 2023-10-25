import { appData, redrawSite } from "../appContext";

export const PostJob = () => {

	const { baseUrl } = appData;

	setTimeout(() => {
		const formElem = document.querySelector<HTMLInputElement>('.postJob form');
		const displayElem = document.querySelector<HTMLDivElement>('.postJob .display');

		if (formElem && displayElem) {
			formElem.addEventListener('submit', async (e) => {
				e.preventDefault();
				const formElem = e.target as HTMLFormElement;
				const formData = new FormData(formElem);

				const job: any = {};
				for (const [key, value] of formData.entries()) {
					job[key] = value;
				}

				const response = await fetch(`${baseUrl}/jobs`,
					{
						method: 'POST',
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(job)
					});

				if (response.status === 201) {
					const newJob = await response.json();
					displayElem.innerHTML = `
						<div class="job">
							<div>Job with ID ${newJob.id} was created.</div>	
						</div>
					`;
					redrawSite();
				} else {
					displayElem.innerHTML = `
						<div class="error">Job could not be created.</div>
					`
				}
			})
		}

	})

	return /*html*/ `
		<style>
			.postJob .jobId {
				width: 2rem;
				margin-right: .3rem;
				text-align: right;
			}
			.postJob input {
				width: 98%;
			}
		</style>
	 	<fieldset class="component postJob">
			<legend>Post Job <span>(with fetch)</span></legend>
			<form>
				<div>Title: <input class="title" name="title"/></div>
				<div>Company: <input class="company" name="company"/></div>
				<div>URL: <input class="url" name="url"/></div>
				<div>Description: <input class="description" name="description"/></div>
				<div>Skill List: <input class="skillList" name="skillList"/></div>
				<div>Publication Date: <input class="publicationDate" name="publicationDate"/></div>
				<div><button>Create</button></div>

			</form>
			<div class="display"></div>
		</fieldset>
	`
}