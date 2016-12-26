defmodule Doubliez.LayoutView do
  use Doubliez.Web, :view

  @doc """
  Calls the `title` fun of the current `view_module` with the performed `:action` as arg.
  """
  def title(conn) do
    apply view_module(conn), :title, [action_name(conn)]
  end
end
