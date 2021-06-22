<template>
	<v-container>
		<AlertBox />
		<v-btn class="ma-2"	color="#30ac7c"	@click="simpleRest()">
			Get Result From Backend	with no auth
		</v-btn>	

		<v-btn class="ma-2"	color="#30ac7c"	@click="roles()">
			Get Result From Backend	with auth
		</v-btn>	
	</v-container>
</template>

<script>
import AlertBox from "@/components/AlertBox";
export default {
	name: "ViewHome",

	components: {		
		AlertBox,
	},

	data() {
		return {			
		};
	},

	watch: {
		"$i18n.locale": {
			immediate: false,
		},
	},

	mounted() {
	
	},

	methods: {

		async roles()
		{
			this.$api.getRoles().then((res) => {
				if (res.errored) {
					this.$bus.$emit("alert", {
						type: "error",
						text: "Erreur API",
					});
				} else if (res.data.length != 0) 
				{
					this.$bus.$emit("alert", {
						type: "success",
						text: res.data.results,
					});
				}
			});
		},
		
		async simpleRest()
		{
			this.$api.getSimpleRest().then((res) => {
				if (res.errored) {
					this.$bus.$emit("alert", {
						type: "error",
						text: "Erreur API",
					});
				} else if (res.data.length != 0) 
				{
					this.$bus.$emit("alert", {
						type: "success",
						text: res.data,
					});
				}
			});
		}
	},
};
</script>

<style lang="scss">
.card-outter {
	position: relative;
	padding-bottom: 50px;
}
.card-actions {
	text-align: center;
	position: absolute;
	width: 100%;
	bottom: 0;
}
</style>