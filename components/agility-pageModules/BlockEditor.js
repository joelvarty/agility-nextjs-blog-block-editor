import React from "react";
import { renderHTML } from "@agility/nextjs";

const BlockEditor = ({ module }) => {
	// get module fields
	const { fields } = module;

	const blockStr = fields.textblob
	if (!blockStr || (!blockStr.length > 0)) {
		return null
	}


	const allBlocks = JSON.parse(blockStr)

	const renderBlock = (block) => {
		switch (block.type) {
			case "header":
				return renderHeader(block)
			case "paragraph":
				return renderParagraph(block)
			case "list":
				return renderList(block)
			case "quote":
				return renderQuote(block)
			case "delimiter":
				return renderDelimiter(block)
			case "warning":
				return renderWarning(block)
			case "image":
				return renderImage(block)
			case "table":
				return renderTable(block)
			case "code":
				return renderCode(block)
			case "raw":
				return renderRaw(block)
			default:
				console.log("UN-RENDERED BLOCK", block)
				return null
		}
	}

	const renderRaw = (block) => {
		return <div dangerouslySetInnerHTML={renderHTML(block.data.html)}
	  />
	}

	const renderCode = (block) => {
		return <pre>
			<code>
				{block.data.code}
			</code>
		</pre>
	}

	const renderTable = (block) => {

		return <table>
			<tbody>
				{block.data.content.map((row, index) =>
					<tr key={`tr-${index}`}>
						{row.map((cell, cellIndex) => <td key={`td-${cellIndex}`}>{cell}</td>)}
					</tr>)
				}
			</tbody>
		</table>

	}

	const renderImage = (block) => {
		return <div className="block-image rounded-lg">
			<div className="">
				<img className="rounded-lg mb-0!" src={block.data.file.url} />
			</div>
			<div className="text-center italic text-sm">{block.data.caption}</div>
		</div>
	}

	const renderWarning = (block) => {
		return <div className="border-2 border-gray-200 rounded-lg">
			<div className="bg-gray-200 p-2 font-semibold">{block.data.title}</div>
			<div className=" p-4">{block.data.message}</div>
		</div>
	}

	const renderDelimiter = (block) => {
		return <hr />
	}

	const renderQuote = (block) => {

		return <figure>
			<blockquote >
				<p>{block.data.text}</p>
			</blockquote>
			<figcaption> - {block.data.caption}</figcaption>
		</figure>

	}

	const renderList = (block) => {
		if (block.type === "unordered") {
			return <ul>{block.data.items.map((item, index) => <li key={index}>{item}</li>)}</ul>
		} else {
			return <ol>{block.data.items.map((item, index) => <li key={index}>{item}</li>)}</ol>
		}
	}

	const renderHeader = (block) => {
		switch (block.data.level) {
			case 1:
				return <h1 className="">{block.data.text}</h1>
			case 2:
				return <h2 className="">{block.data.text}</h2>
			case 3:
				return <h3 className="">{block.data.text}</h3>
			case 4:
				return <h4 className="">{block.data.text}</h4>
			case 5:
				return <h5 className="">{block.data.text}</h5>
		}


	}

	const renderParagraph = (block) => {
		return <div dangerouslySetInnerHTML={renderHTML(block.data.text)} />
	}

	return (
		<div className="blocks relative px-8">
			<div className="max-w-2xl mx-auto my-12 md:mt-18 lg:mt-20">
				<div
					className="prose max-w-full mx-auto">
					{allBlocks.blocks.map((block, index) => <div key={index}>{renderBlock(block)}</div>)}
				</div>
			</div>
		</div>
	);
};

export default BlockEditor;
