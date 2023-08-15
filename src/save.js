/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save(props) {
	let blockProps = useBlockProps.save({
		className: [
			"scrollable-gallery",
			props.attributes.pauseOnHover ? "pause-on-hover" : null,
		],
		style: {
			"--total-container-transform": ((props.attributes.images.length + 1) * 16)
				.toString()
				.concat("vw"),
		},
	});

	return (
		<div {...blockProps}>
			<figure className="scrollable-gallery-inner-container" data-direction={props.attributes.direction}>
				{props.attributes.images.map((image, index) => (
					<img key={index} src={image.url} data-mediaid={image.id} />
				))}

				{props.attributes.images.map((image, index) => (
					<img
						className="duplicate-image"
						key={index}
						src={image.url}
						data-mediaid={image.id}
					/>
				))}
			</figure>
		</div>
	);
}