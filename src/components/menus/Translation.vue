<template>
	<v-menu
		bottom
		close-delay="100"
		content-class="rounded"
		left
		max-height="500"
		offset-y
		open-delay="60"
		open-on-hover
		transition="slide-y-transition"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<template v-slot:activator="{ attrs, on }">
			<v-btn
				:icon="$vuetify.breakpoint.smAndDown"
				class="text--secondary px-0 px-md-2"
				text
				v-bind="attrs"
				v-on="on"
			>
				<v-icon>mdi-translate</v-icon>
				<v-icon class="hidden-sm-and-down" size="14">mdi-chevron-down</v-icon>
			</v-btn>
		</template>

		<v-sheet class="overflow-hidden text-small" :outlined="false" :rounded="true" v-on="$listeners">
			<v-list>
				<v-subheader class="text--primary font-weight-black text-uppercase" v-text="heading" />
				<v-list-item-group v-model="locale">
					<v-list-item v-for="item in locales" :key="item.locale" :value="item.locale" replace>
						<v-list-item-title v-text="item.title" />
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-sheet>
	</v-menu>
</template>

<script>
import locales from "@/i18n/locales";

export default {
	name: "MenuTranslation",

	data() {
		return {
			heading: this.$t("MenuTranslation.translations"),
			locales,
		};
	},

	computed: {
		locale: {
			get() {
				return this.$i18n.locale;
			},
			set(locale) {
				console.log("Changing locale to '" + locale + "'");
				this.$i18n.locale = locale;
			},
		},
		items() {
			return [{ heading: this.$t("translations") }, ...this.locales];
		},
	},
};
</script>
