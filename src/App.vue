<template>
	<div>
		<div class="title">CRUD DEMO v7.0.0</div>

		<cl-crud ref="Crud" :border="false" padding="0px">
			<cl-row>
				<cl-add-btn />
				<cl-adv-btn />

				<cl-flex1 />

				<cl-search-key
					field="name"
					:field-list="[
						{
							label: '昵称',
							value: 'name'
						},
						{
							label: '手机号',
							value: 'phone'
						}
					]"
					refreshOnInput
				></cl-search-key>
			</cl-row>

			<cl-row>
				<cl-table ref="Table" :auto-height="false"></cl-table>
			</cl-row>

			<cl-row>
				<cl-flex1 />
				<cl-pagination />
			</cl-row>

			<cl-upsert ref="Upsert"></cl-upsert>
			<cl-adv-search ref="AdvSearch"></cl-adv-search>
		</cl-crud>
	</div>
</template>

<script setup lang="tsx">
import { ref } from "vue";
import { useTable, useForm, useUpsert, useCrud } from "./hooks";
import { EditPen } from "@element-plus/icons-vue";

interface Data {
	name?: string;
	age?: number;
	[key: string]: any;
}
const name = ref("App");
const Upsert = useUpsert<Data>({
	items: [
		{
			type: "tabs",
			props: {
				labels: [
					{
						label: "A",
						value: "A",
						icon: EditPen
					},
					{
						label: "B",
						value: "B"
					}
				]
			}
		},
		{
			group: "A",
			prop: "name",
			label: "Name",
			component: {
				name: "el-input"
			}
		},
		{
			group: "B",
			prop: "age",
			label: "Age",
			component: {
				name: "el-input"
			}
		},
		{
			group: "B",
			prop: "证书",
			label: "证书",
			component: {
				name: "el-input"
			},
			hidden({ scope }) {
				return scope.age < 18;
			}
		},
		() => {
			return {
				group: "A",
				hidden: Upsert.value?.mode == "add",
				hook: {
					bind(value, { form }) {
						return "";
					},
					submit(value, { form }) {}
				}
			};
		}
	],
	onOpened(data) {
		Upsert.value?.setForm("age", "18");
	}
});

const Table = useTable<Data>({
	contextMenu: [
		{
			label: "带图标",
			prefixIcon: EditPen
		},
		{
			label: "多层级",
			children: [
				{
					label: "A",
					children: [
						{
							label: "A-1"
						}
					]
				},
				{
					label: "B"
				}
			]
		}
	],

	columns: [
		{ type: "selection", width: 60 },
		{
			label: "姓名",
			prop: "name"
			// search: {
			// 	component: {
			// 		name: "el-date-picker"
			// 	}
			// }
		},
		{
			label: "手机号",
			prop: "phone"
			// search: {
			// 	component: {
			// 		name: "el-date-picker"
			// 	}
			// }
		},
		{
			type: "op"
		}
	]
});

const Crud = useCrud(
	{
		service: "test"
	},
	(app) => {
		app.refresh();
	}
);

const Form = useForm<Data>();
</script>

<style scoped>
.title {
	text-align: center;
	font-size: 14px;
	font-weight: bold;
}
</style>
