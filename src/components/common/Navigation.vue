<template>
	<v-app-bar dense app height="64dp" fixed>
		<v-app-bar-nav-icon @click="goHome()">
			<v-icon>mdi-home</v-icon>
		</v-app-bar-nav-icon>
		<v-toolbar-title @click="goHome()" style="cursor:pointer">{{ $t("CommonNavigation.title") }}</v-toolbar-title>
		<v-spacer></v-spacer>	
		<v-btn depressed to="/login" v-if="!userLogged" class="ml-3">
			<span>{{ $t("CommonNavigation.login") }}</span>
			<v-icon>mdi-account-lock</v-icon>
		</v-btn>
		<v-btn depressed v-if="userLogged" @click="loggout" class="ml-3">
			<span>{{ $t("CommonNavigation.logout") }}</span>
			<v-icon>mdi-logout</v-icon>
		</v-btn>
		<v-divider class="mx-2 my-auto" inset vertical style="height: 16px;" />
		<v-tooltip v-if="!$store.state.theme.dark" bottom>
			<template v-slot:activator="{ on }">
				<v-btn depressed v-on="on" @click="toggleDarkMode" class="text--secondary px-0 px-md-2" text>
					<v-icon class="mr-1">mdi-lightbulb-on</v-icon>
				</v-btn>
			</template>
			<span>{{ $t("CommonNavigation.dark-mode") }}</span>
		</v-tooltip>
		<v-tooltip v-else bottom>
			<template v-slot:activator="{ on }">
				<v-btn depressed v-on="on" @click="toggleDarkMode" class="text--secondary px-0 px-md-2" text>
					<v-icon>mdi-lightbulb</v-icon>
				</v-btn>
			</template>
			<span>{{ $t("CommonNavigation.light-mode") }}</span>
		</v-tooltip>
		<MenuTranslation />
	</v-app-bar>
</template>

<script>
import MenuTranslation from "@/components/menus/Translation";

export default {
	name: "CommonNavigation",

	components: {
		MenuTranslation,
	},

	computed: {
		userLogged: {
			get() {
				return this.$store.state.auth.status.loggedIn;
			},
			set() {},
		},
	},

	watch: {
		userLogged(value) {
			console.log(`user change state ${value}`);
		},
	},

	methods: {
		goHome() {
			if (this.$route.path != "/") {
				this.$router.push("/");
			}
		},

		async loggout() {	
			this.$store.dispatch("auth/logout", this.user).then(() => {			
				this.$router.push("/").catch(()=>{});
			});
		},

		toggleDarkMode() {
			this.$store.dispatch("theme/toggleDarkMode");
		},
	},
};
</script>
