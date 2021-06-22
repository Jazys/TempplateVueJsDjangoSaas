<template>
	<v-footer padless height="10dp">
		<v-card flat tile dark class="text-center ma-0 pa-0" fluid style="width: 100%">
			<v-card-text>
				<v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
					<v-icon size="24px">{{ icon }}</v-icon>
				</v-btn>
			</v-card-text>
			<v-card-text class="white--text pt-0">{{ $t('CommonFooter.footline') }}</v-card-text>
			<v-divider></v-divider>
			<v-card-text class="white--text">
				© {{ new Date().getFullYear() }}
				<strong>{{ $t('CommonFooter.foottitle') }}</strong> 
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
export default {
	name: "CommonFooter",

	data: () => ({
		icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
	}),
};
</script>