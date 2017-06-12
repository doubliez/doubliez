defmodule Doubliez.PageView do
  use Doubliez.Web, :view

  def title(_), do: full_name()

  def full_name do
    "Thibault Doubliez"
  end
end
