import { title } from "@/components/primitives";
import {Button} from '@nextui-org/button';
export default function AboutPage() {
	return (
		<div>
			<Button>Click me</Button>
			<h1 className={title()}>About</h1>
			<h1 className="text-3xl font-bold underline">
			Hello world!
			</h1>
		</div>
	);
}
