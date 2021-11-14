<script>
	let url = ''
	let loader = false;
	let onload = true;
	let issues = [];
	let errorText = '';
	const submitUrl = async (e)=>{
		loader = true
		if(url){
			let response = await fetch(`/api/test?url=${url}`)
			if (response.status === 200) {
				const data = await response.json()
				issues = data.issues;
				if (issues.length > 0) {
					loader = false
					errorText = "Congrats!!! No issue found."
				}
				onload = false
			} else{
				issues = []
				loader = false
				onload = false
				const err = await response.json();
				errorText = err.error;
			}
		} else {
			issues = []
			loader = false
			onload = false
			errorText = "URL Required!";
		}
	}

</script>


<svelte:head>
	<title>Website Insights</title>
	<meta name="robots" content="noindex nofollow" />
	<html lang="en" />
	<!-- CSS only -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<link rel="stylesheet" href="https://bootswatch.com/5/lux/bootstrap.min.css">
</svelte:head>

<section class="section">
	<div class="container">
		<div class="row py-5">
			<div class="col-12 col-md-12 col-sm-12">
				<div class="card card-body bg-dark text-light">
					<form id="form">
						<div class="form-group">
							<div class="input-group mb-2">
								<input type="url" name="url" id="url" class="form-control" placeholder="Enter your website url" bind:value={url}>
								<button class="btn btn-primary" on:click|preventDefault="{submitUrl}">Submit</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
		{#if loader === true}
		<div class="d-flex flex-row justify-content-center align-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		</div>
		{/if}
		{#if loader === false && issues.length > 0}
		<div class="row py-5">
			<div class="col-12 col-md-12 col-sm-12">
				{#each issues as issue}
				<div class="card mb-3 shadow-sm">
					<div class="card-body">
						<h4>{issue.message}</h4>
						<p class="bg-light p-3 my-3">
							{issue.context}
						</p>
						<p class="bg-primary text-light p-2">
							CODE: {issue.code}
						</p>
					</div>
				</div>
				{/each}
			</div>
		</div>
		{:else if loader === false && issues.length === 0 && onload === false}
			<div class="row">
				<div class="col-12 col-md-12 col-sm-12 text-center">
					<h3 class="text-danger">{errorText}</h3>
				</div>
			</div>
		{/if}
	</div>
</section>

