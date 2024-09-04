import { defineComponent } from "vue";
import { useConfig, useCore } from "../../hooks";

/**
 * Crud 组件专用的 Add 按钮
 */
export default defineComponent({
	name: "cl-add-btn",

	setup(_, { slots }) {
		// 从 Crud 组件获取 provide('crud') 的值
		const { crud } = useCore();
		const { style } = useConfig();

		return () => {
			return (
				crud.getPermission("add") && (
					<el-button type="primary" size={style.size} onClick={crud.rowAdd}>
						{slots.default?.() || crud.dict.label.add}
					</el-button>
				)
			);
		};
	}
});
