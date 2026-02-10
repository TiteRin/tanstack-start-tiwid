import type { Meta, StoryObj } from "@storybook/react"

const meta: Meta = {
    title: "Foundations/Typography",
}

export default meta

export const Overview: StoryObj = {
    render: () => (
        <div className="space-y-6 p-8 bg-base-100 text-base-content">
            <h1>This Is What I Did Today</h1>
            <h2>Small wins matter</h2>
            <h3>You showed up</h3>

            <p>
                This is body text in Nunito. It should feel warm and calm.
            </p>

            <p className="text-praise">
                Amazing!
            </p>
        </div>
    ),
}
