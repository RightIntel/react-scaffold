## **name** hook

Description here

## Example usage

```jsx harmony
export default function MyComponent() {
	const { res1, res2 } = __name__(arg1, arg2);
	return (
		<div className="Component MyComponent">
			<div className={res1}>{res2}</div>
		</div>
	);
}
```
